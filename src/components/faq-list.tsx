import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { FaqRecord } from "@/lib/types";
import { track } from "@/lib/analytics";

export function FaqList({ items }: { items: FaqRecord[] }) {
  if (!items.length) {
    return <p className="text-mist">常見問題整理中。</p>;
  }
  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-line rounded-xl border border-line bg-raised">
      {items.map((item) => (
        <Accordion.Item key={item.id} value={item.id}>
          <Accordion.Header>
            <Accordion.Trigger
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-medium hover:bg-paper"
              onClick={() => track("faq_open", { eventId: item.id })}
            >
              {item.question}
              <ChevronDown className="size-4 shrink-0 text-mist transition-transform duration-200 ease-[var(--ease-out)] [[data-state=open]_&]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in">
            <p className="px-5 pb-5 text-sm leading-relaxed text-mist">{item.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
