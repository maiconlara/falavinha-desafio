import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  IconCurrencyReal,
  IconLocation,
  IconUser,
  IconMail,
  IconPhone,
  IconCalendar,
  IconMapPin,
  IconMapPins,
} from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createCandidateSchema } from "@/utils/validations/createCandidateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconInput } from "@/components/ui/icon-input";
import { ReactNode, useEffect, useState } from "react";
import { InputMask } from "@react-input/mask";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { plans } from "@/lib/plans";
import { jobs } from "@/lib/jobs";
import { z } from "zod";
import { MaskedInput } from "@/components/ui/masked-input";
import { useGetAddress } from "@/utils/hooks/useGetAddress";
import useDebounce from "@/utils/hooks/useDebouce";
import Lottie from "lottie-react";
import checkout from "@/assets/checkout.json";
import { db } from "@/db";
interface CreateUserModalProps {
  children: ReactNode;
  selectedPlan?: string;
}

const CandidateModal = ({ children, selectedPlan }: CreateUserModalProps) => {
  const [query, setQuery] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const form = useForm<z.infer<typeof createCandidateSchema>>({
    resolver: zodResolver(createCandidateSchema),
    defaultValues: {
      name: "",
      email: "",
      postalCode: "",
      phone: "",
      state: "",
      city: "",
      birthday: "",
      job: "",
      salary: "",
      plan: "",
    },
  });

  const { data, refetch } = useGetAddress(form.getValues("postalCode"));

  async function onSubmit(data: z.infer<typeof createCandidateSchema>) {
    console.log(data);
    try {
      await db.candidates.add({
        name: data.name,
        email: data.email,
        postalCode: data.postalCode,
        phone: data.phone,
        state: data.state,
        city: data.city,
        birthday: data.birthday.split("/").reverse().join("-"),
        job: data.job,
        salary: data.salary,
        plan: data.plan,
      });
      setIsConfirmed(true);
    } catch (error) {
      console.log(`Failed to add data: ${error}`);
    }
  }

  useDebounce(
    () => {
      refetch();
    },
    1500,
    [query]
  );

  useEffect(() => {
    if (selectedPlan) {
      form.setValue("plan", selectedPlan);
    }
  }, []);

  useEffect(() => {
    if (data) {
      form.setValue("state", data.state);
      form.setValue("city", data.city);
    }
  }, [data, form]);

  const clearFormData = () => {
    form.reset();
    setIsConfirmed(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-h-[514px]">
        {!isConfirmed ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-poppins text-ribbon-950">
                Cadastro do Candidato
              </DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para se candidatar a vaga
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="user-form"
                className="grid grid-cols-2 gap-4 py-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormControl>
                        <IconInput
                          {...field}
                          placeholder="Nome completo"
                          Icon={IconUser}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormControl>
                        <IconInput
                          {...field}
                          placeholder="Email"
                          Icon={IconMail}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="col-span-1 ">
                      <FormControl>
                        <MaskedInput
                          {...field}
                          placeholder="Telefone"
                          Icon={IconPhone}
                          maskInput={{
                            input: InputMask,
                            mask: "+55 (__) _____-____",
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem className="col-span-1 ">
                      <FormControl>
                        <MaskedInput
                          {...field}
                          placeholder="Nascimento"
                          Icon={IconCalendar}
                          maskInput={{ input: InputMask, mask: "__/__/____" }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormControl>
                        <IconInput
                          {...field}
                          autoComplete="off"
                          onInput={(e) =>
                            setQuery((e.target as HTMLInputElement).value)
                          }
                          maxLength={8}
                          placeholder="CEP"
                          Icon={IconLocation}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="col-span-1 ">
                      <FormControl>
                        <IconInput
                          {...field}
                          placeholder="Estado"
                          disabled
                          Icon={IconMapPin}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="col-span-1 ">
                      <FormControl>
                        <IconInput
                          {...field}
                          disabled
                          placeholder="Cidade"
                          Icon={IconMapPins}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem className="col-span-1 ">
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            form.setValue("plan", value);
                          }}
                        >
                          <SelectTrigger className="h-10 w-[180px] ">
                            <SelectValue
                              placeholder="Plano escolhido"
                              {...field}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {plans.map((plan) => {
                              return (
                                <SelectItem key={plan.title} value={plan.title}>
                                  {plan.title}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="job"
                  render={({ field }) => (
                    <FormItem className="col-span-1 ">
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            form.setValue("job", value);
                          }}
                        >
                          <SelectTrigger className="h-10 w-[180px] ">
                            <SelectValue
                              placeholder="Selecione uma vaga"
                              {...field}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {jobs.map((job) => {
                              return (
                                <SelectItem key={job.key} value={job.key}>
                                  {job.value}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem className="col-span-1 ">
                      <FormControl>
                        <MaskedInput
                          {...field}
                          placeholder="Pretenção salárial"
                          Icon={IconCurrencyReal}
                          maskInput={{ input: InputMask, mask: "____.__" }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <DialogFooter>
              <Button
                type="submit"
                form="user-form"
                className="flex rounded-full font-semibold text-white py-2 px-6 justify-center items-center w-full max-w-[176px] bg-ribbon-600 hover:bg-ribbon-700 transition-colors "
              >
                Confirmar
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-poppins text-ribbon-950">
                Sucesso!
              </DialogTitle>
              <DialogDescription>
                Os dados da candidatura foram salvos.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col w-full h-full items-center justify-center">
              <Lottie
                animationData={checkout}
                loop={false}
                style={{
                  width: "200px",
                  height: "200px",
                }}
              />
            </div>
            <DialogFooter>
              <div className="flex flex-col w-full items-center justify-center">
                <DialogClose asChild onClick={() => clearFormData()}>
                  <Button
                    type="button"
                    className="flex rounded-full font-semibold text-white py-2 px-6 justify-center items-center w-full max-w-[176px] bg-ribbon-600 hover:bg-ribbon-700 transition-colors "
                  >
                    Entendido!
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default CandidateModal;
