import { CustomSelect } from "@/app/_components/Select/Select";
import { addAccount } from "@/app/_feature/account/accountThunk";
import { useAppDispatch } from "@/app/_feature/hooks";
import { ACCOUNT_TYPES, CURRENCY } from "@/app/_utils/constants";
import { Badge } from "@/components/ui/badge";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";

const AccountForm = ({
  form,
  setOpen,
}: {
  form: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
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

  const onSubmit = async (data: any) => {
    const { accountName, accountType, ...rest } = data;
    try {
      const res = await dispatch(
        addAccount({
          ...rest,
          name: accountName,
          type: accountType,
          isArchived: false,
        }),
      );
      if (!res?.payload?.success) {
        toast.error(res?.payload?.message);
      } else {
        toast.success("Account saved");
        setOpen(false);
        reset();
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <div>
      <form id="account-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="gap-3">
          <div className="">
            <Field>
              <FieldLabel htmlFor="accountType" className="form-label">
                Account type*
              </FieldLabel>
              <Controller
                control={control}
                name="accountType"
                render={({ field }) => (
                  <div className="grid grid-cols-3 gap-2">
                    {ACCOUNT_TYPES.map((type) => (
                      <Badge
                        key={type}
                        selected={field.value === type}
                        onClick={() => field.onChange(type)}
                        className="w-full h-8"
                      >
                        {type.replace("_", " ")}
                      </Badge>
                    ))}
                  </div>
                )}
              />
              {errors?.accountType && (
                <FieldDescription className="form-error">
                  {errors?.accountType?.message}
                </FieldDescription>
              )}
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="accountName" className="form-label">
              Account name*
            </FieldLabel>
            <Input
              id="accountName"
              {...register("accountName")}
              type="text"
              placeholder="e.g. Axis Salary Account"
              className="form-input"
            />
            {errors?.accountName && (
              <FieldDescription className="form-error">
                {errors?.accountName?.message}
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="bankName" className="form-label">
              Bank name*
            </FieldLabel>
            <Input
              id="bankName"
              {...register("bankName")}
              type="text"
              placeholder="e.g. Axis Bank"
              className="form-input"
            />
            {errors?.bankName && (
              <FieldDescription className="form-error">
                {errors?.bankName?.message}
              </FieldDescription>
            )}
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="openingBalance" className="form-label">
                Opening balance*
              </FieldLabel>
              <Input
                id="openingBalance"
                {...register("openingBalance", {
                  valueAsNumber: true,
                  setValueAs: (v: any) => (v === "" ? undefined : Number(v)),
                })}
                type="number"
                placeholder="Enter amount"
                className="form-input"
              />
              {errors?.openingBalance && (
                <FieldDescription className="form-error">
                  {errors?.openingBalance?.message}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="currency" className="form-label">
                Currency
              </FieldLabel>
              <Controller
                control={control}
                name="currency"
                render={({ field }) => (
                  <CustomSelect
                    options={CURRENCY}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select currency"
                    disabled={true}
                  />
                )}
              />{" "}
              {errors?.currency && (
                <FieldDescription className="form-error">
                  {errors?.currency?.message}
                </FieldDescription>
              )}
            </Field>
          </div>
          <div className="h-[0.5px] bg-[var(--color-bdr)] my-2"></div>
          <div className="flex items-center space-x-2">
            <Controller
              control={control}
              name="isDefault"
              render={({ field }) => (
                <Switch
                  id="isDefault"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <FieldLabel htmlFor="isDefault" className="form-label">
              Set as default account
            </FieldLabel>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default AccountForm;
