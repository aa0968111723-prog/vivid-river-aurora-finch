import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resolveTurtlePresentation } from "./presentation.ts";
import { nextAmbient } from "./ambient.ts";
import { clearTurtleSeen, readTurtleSeen, writeTurtleSeen } from "./seen.ts";
import {
  applyBlinkScale,
  applyHeadRotation,
  applyLimbRotation,
  createTurtleMachine,
  nextSpokenStep,
  poseDelta,
  targetPose,
  tickTurtle,
  transitionTurtle,
  type TurtlePhase,
} from "./state-machine.ts";

describe("turtle presentation", () => {
  it("uses a static turtle when reduced motion is requested", () => {
    assert.equal(
      resolveTurtlePresentation({
        reducedMotion: true,
        webgl: true,
        lowPower: false,
        disable3dOnMobile: false,
        mobile: false,
      }),
      "static",
    );
    assert.equal(
      resolveTurtlePresentation({
        reducedMotion: false,
        webgl: false,
        lowPower: false,
        disable3dOnMobile: false,
        mobile: false,
      }),
      "static",
    );
    assert.equal(
      resolveTurtlePresentation({
        reducedMotion: false,
        webgl: true,
        lowPower: true,
        disable3dOnMobile: false,
        mobile: false,
      }),
      "simple",
    );
  });

  it("advances the spoken line off the entrance sentence", () => {
    const first = nextSpokenStep("enter", 0, 6);
    assert.deepEqual(first, { kind: "line", phase: "talk", line: 1 });
    assert.notEqual(first.kind === "line" ? first.line : -1, 0);
    const second = nextSpokenStep("talk", 1, 6);
    assert.deepEqual(second, { kind: "line", phase: "talk", line: 2 });
    assert.deepEqual(nextSpokenStep("talk", 5, 6), { kind: "meditate", line: 5 });
    assert.deepEqual(nextSpokenStep("idle", 5, 6), { kind: "line", phase: "talk", line: 0 });
  });

  it("sets the head from the pointer instead of spinning it", () => {
    const rest = { x: 0, y: 0, z: 0 };
    const pose = targetPose("enter", 1);
    const look = { x: 0.4, y: -0.2 };
    const first = applyHeadRotation(rest, pose, look);
    const second = applyHeadRotation(rest, pose, look);
    assert.deepEqual(first, second);
    assert.ok(Math.abs(first.y) < 0.25);
    assert.ok(Math.abs(first.x) < 0.25);
  });

  it("blinks and drifts limbs from the pose without stacking", () => {
    const idle = targetPose("idle", 4.7);
    const open = targetPose("idle", 1);
    assert.ok(applyBlinkScale(0.08, idle) < applyBlinkScale(0.08, open));
    const drift = applyLimbRotation(0, open, 1);
    assert.equal(drift, applyLimbRotation(0, open, 1));
    assert.notEqual(drift, applyLimbRotation(0, open, -1));
  });

  it("remembers a visit in the storage it is given and stops one ambient source", () => {
    const storage = {
      value: null as string | null,
      getItem() {
        return this.value;
      },
      setItem(_key: string, value: string) {
        this.value = value;
      },
      removeItem() {
        this.value = null;
      },
    };
    assert.equal(readTurtleSeen(storage), false);
    writeTurtleSeen(storage);
    assert.equal(readTurtleSeen(storage), true);
    clearTurtleSeen(storage);
    assert.equal(readTurtleSeen(storage), false);
    let stops = 0;
    const playing = nextAmbient(null, () => ({
      stop() {
        stops += 1;
      },
    }));
    assert.ok(playing);
    assert.equal(
      nextAmbient(playing, () => {
        throw new Error("stacked");
      }),
      null,
    );
    assert.equal(stops, 1);
  });

  it("enters idle, enter, talk, meditate, and wake without a pose pop", () => {
    let machine = createTurtleMachine();
    for (let step = 0; step < 30; step += 1) machine = tickTurtle(machine, 0.1);
    const phases: TurtlePhase[] = ["idle", "enter", "talk", "meditate", "wake"];
    for (const phase of phases) {
      const before = { ...machine.pose };
      machine = transitionTurtle(machine, phase);
      assert.equal(machine.phase, phase);
      assert.equal(poseDelta(before, machine.pose), 0);
      const next = tickTurtle(machine, 0.016);
      assert.ok(poseDelta(before, next.pose) < 0.2);
      machine = next;
    }
  });
});
