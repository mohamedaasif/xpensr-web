import { DatePickerInput } from "@/app/_components/DatePicker/DatePicker";
import { CustomSelect } from "@/app/_components/Select/Select";
import { useAppDispatch } from "@/app/_feature/hooks";
import {
  addTransaction,
  editTransaction as updateTransaction,
} from "@/app/_feature/transaction/transactionThunk";
import { Account } from "@/app/_types/accounts";
import { Transaction } from "@/app/_types/transaction";
import { PAYMENT_METHOD, TRANSACTION_TYPES } from "@/app/_utils/constants";
import { Badge } from "@/components/ui/badge";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";

const TransactionForm = ({
  form,
  setOpen,
  editTransaction,
  setEditTransaction,
  accountsData,
}: {
  form: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  editTransaction: Transaction | null;
  setEditTransaction: Dispatch<SetStateAction<Transaction | null>>;
  accountsData: Account[] | null;
}) => {
  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const accountOptions =
    accountsData?.map((account) => ({
      label: `${account.bankName}`,
      value: account.id,
    })) ?? [];

  const onSubmit = async (data: any) => {
    const { transactionDate, account, ...rest } = data;
    const payload = {
      ...rest,
      accountId: account,
      transactionDate: format(transactionDate, "MM/dd/yyyy"),
    };
    try {
      const res = editTransaction?.id
        ? await dispatch(
            updateTransaction({
              id: editTransaction?.id,
              data: { ...payload },
            }),
          )
        : await dispatch(
            addTransaction({
              ...payload,
            }),
          );
      if (!res?.payload?.success) {
        toast.error(res?.payload?.message);
      } else {
        toast.success(
          editTransaction?.id ? "Transaction updated" : "Transaction saved",
        );
        setOpen(false);
        reset();
        setEditTransaction(null);
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <div>
      <form id="transaction-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="gap-3">
          <Field>
            <FieldLabel htmlFor="type" className="form-label">
              Transaction type*
            </FieldLabel>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <div className="grid grid-cols-3 gap-2">
                  {TRANSACTION_TYPES.map((type) => (
                    <Badge
                      key={type}
                      selected={field.value === type}
                      onClick={() => field.onChange(type)}
                      className="w-full h-8"
                      variant={
                        type === "Income"
                          ? "secondary"
                          : type === "Expense"
                            ? "destructive"
                            : "default"
                      }
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              )}
            />
            {errors?.type && (
              <FieldDescription className="form-error">
                {errors?.type?.message}
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="amount" className="form-label">
              Amount*
            </FieldLabel>
            <Input
              id="amount"
              {...register("amount", {
                valueAsNumber: true,
                setValueAs: (v: any) => (v === "" ? undefined : Number(v)),
              })}
              type="number"
              placeholder="Enter amount"
              className="form-input"
            />
            {errors?.amount && (
              <FieldDescription className="form-error">
                {errors?.amount?.message}
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="description" className="form-label">
              Description*
            </FieldLabel>
            <Input
              id="description"
              {...register("description")}
              type="text"
              placeholder="e.g. Food, Salary..."
              className="form-input"
            />
            {errors?.description && (
              <FieldDescription className="form-error">
                {errors?.description?.message}
              </FieldDescription>
            )}
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="account" className="form-label">
                Account*
              </FieldLabel>
              <Controller
                control={control}
                name="account"
                render={({ field }) => (
                  <CustomSelect
                    options={accountOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select account"
                  />
                )}
              />{" "}
              {errors?.account && (
                <FieldDescription className="form-error">
                  {errors?.account?.message}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="paymentMethod" className="form-label">
                Payment method*
              </FieldLabel>
              <Controller
                control={control}
                name="paymentMethod"
                render={({ field }) => (
                  <CustomSelect
                    options={PAYMENT_METHOD}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select payment"
                  />
                )}
              />{" "}
              {errors?.paymentMethod && (
                <FieldDescription className="form-error">
                  {errors?.paymentMethod?.message}
                </FieldDescription>
              )}
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="transactionDate"
              render={({ field }) => (
                <DatePickerInput
                  id="transactionDate"
                  label="Transaction date*"
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  placeholder="MM/DD/YYYY"
                  error={errors?.transactionDate?.message}
                />
              )}
            />
            <Field>
              <FieldLabel htmlFor="location" className="form-label">
                Location
              </FieldLabel>
              <Input
                id="location"
                {...register("location")}
                type="text"
                placeholder="Enter location"
                className="form-input"
              />
              {errors?.location && (
                <FieldDescription className="form-error">
                  {errors?.location?.message}
                </FieldDescription>
              )}
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="referenceNo" className="form-label">
              Reference no.
            </FieldLabel>
            <Input
              id="referenceNo"
              {...register("referenceNo")}
              type="text"
              placeholder="Enter reference no."
              className="form-input"
            />
            {errors?.location && (
              <FieldDescription className="form-error">
                {errors?.location?.message}
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="notes" className="form-label">
              Notes
            </FieldLabel>
            <Textarea
              id="notes"
              {...register("notes")}
              className="form-input !py-[10px]"
              placeholder="Any additional details..."
            />
          </Field>
          {/* // !TODO for phase 2 */}
          {/* <div className="h-[0.5px] bg-[var(--color-bdr)] my-2"></div>
          <div className="flex items-center space-x-2">
            <Controller
              control={control}
              name="isRecurring"
              render={({ field }) => (
                <Switch
                  id="isRecurring"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <FieldLabel htmlFor="isRecurring" className="form-label">
              Mark as recurring
            </FieldLabel>
          </div> */}
        </FieldGroup>
      </form>
    </div>
  );
};

export default TransactionForm;
