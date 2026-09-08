import { PaymentTimeline } from "@/components/commerce/PaymentTimeline";
import { Section, SectionInner } from "@/components/layout/Section";
import { content } from "@/content/avana";
import { canPublishPricing } from "@/lib/compliance";

/** Payment and possession (spec 6.12). Absent pre-registration (spec 3.3). */
export function PaymentSection() {
  if (!canPublishPricing) return null;
  const payment = content.payment;

  return (
    <Section id="payment" background="mist-hi" rail={{ label: "Payment" }}>
      <SectionInner>
        <h2 className="subdisplay text-step-3">{payment.headline}</h2>
        <div className="mt-14">
          <PaymentTimeline steps={payment.steps} />
        </div>
        <p className="caption mt-14 border-t border-[var(--rule)] pt-6">
          {payment.caption}
        </p>
      </SectionInner>
    </Section>
  );
}
