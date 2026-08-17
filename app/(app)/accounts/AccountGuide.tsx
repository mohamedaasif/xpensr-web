type AccountGuideItem = {
  icon: string;
  title: string;
  description: string;
  dotColor: string;
};

const accountGuideItems: AccountGuideItem[] = [
  {
    icon: "🏦",
    title: "Savings",
    description: "SBI, HDFC, Axis savings",
    dotColor: "bg-[var(--color-pos)]",
  },
  {
    icon: "🏢",
    title: "Current",
    description: "Business / salary account",
    dotColor: "bg-[var(--color-blue-600)]",
  },
  {
    icon: "💳",
    title: "Credit Card",
    description: "HDFC Regalia, Axis Flipkart",
    dotColor: "bg-[var(--color-neg)]",
  },
  {
    icon: "📱",
    title: "Wallet",
    description: "Paytm Wallet, Amazon Pay",
    dotColor: "bg-[var(--color-wallet-text)]",
  },
  {
    icon: "💵",
    title: "Cash",
    description: "Physical cash on hand",
    dotColor: "bg-[var(--color-ink-3)]",
  },
  {
    icon: "📈",
    title: "Investment",
    description: "Zerodha, Groww, FD, MF",
    dotColor: "bg-[var(--color-violet-700)]",
  },
];

const AccountGuide = () => {
  return (
    <div className="overflow-hidden rounded-[12px] border-[0.5px] border-[var(--color-bdr)] bg-[var(--color-card)]">
      <div className="flex items-center justify-between border-b-[0.5px] border-[var(--color-bdr)] px-[14px] py-[11px]">
        <span className="text-[12px] font-medium text-[var(--color-ink)]">
          What account type should I add?
        </span>
      </div>

      <div className="px-[14px] py-[10px]" id="acc-type-guide">
        {accountGuideItems.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-[10px] border-b-[0.5px] border-[var(--color-bdr)] py-2 last:border-b-0"
          >
            <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[6px] bg-[var(--color-card-2)] text-[14px]">
              {item.icon}
            </div>

            <div className="flex-1">
              <span className="text-[12px] font-medium text-[var(--color-ink)]">
                {item.title}
              </span>

              <span className="ml-[7px] text-[11px] text-[var(--color-ink-3)]">
                {item.description}
              </span>
            </div>

            <div
              className={`h-[7px] w-[7px] shrink-0 rounded-full ${item.dotColor}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountGuide;
