//#region node_modules/.nitro/vite/services/ssr/assets/format-Cui_ik7J.js
var TAIPEI = "Asia/Taipei";
function computeEventStatus(input) {
	if (input.statusOverride) return input.statusOverride;
	const now = Date.now();
	const ends = Date.parse(input.endsAt);
	const starts = Date.parse(input.startsAt);
	if (Number.isFinite(ends) && now > ends) return "ended";
	if (input.capacity != null && input.registeredCount != null) {
		if (input.registeredCount >= input.capacity) return "full";
		if (input.capacity - input.registeredCount <= 3) return "filling";
	}
	if (input.registrationMode !== "closed" && (!Number.isFinite(starts) || now < starts)) return "open";
	return "upcoming";
}
function taipeiParts(iso) {
	const date = new Date(iso);
	const fmt = new Intl.DateTimeFormat("zh-TW", {
		timeZone: TAIPEI,
		year: "numeric",
		month: "numeric",
		day: "numeric",
		weekday: "short",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	});
	const bag = {};
	for (const p of fmt.formatToParts(date)) if (p.type !== "literal") bag[p.type] = p.value;
	return bag;
}
function formatEventDate(iso) {
	const p = taipeiParts(iso);
	const weekday = (p.weekday ?? "").replace("週", "");
	return `${p.month}/${p.day}（${weekday}）`;
}
function formatEventTime(iso) {
	const p = taipeiParts(iso);
	return `${p.hour}:${p.minute}`;
}
function formatEventRange(startsAt, endsAt) {
	return `${formatEventDate(startsAt)} ${formatEventTime(startsAt)}–${formatEventTime(endsAt)}`;
}
function formatRemaining(capacity, registered) {
	if (capacity == null || registered == null) return null;
	return Math.max(0, capacity - registered);
}
//#endregion
export { formatRemaining as i, formatEventDate as n, formatEventRange as r, computeEventStatus as t };
