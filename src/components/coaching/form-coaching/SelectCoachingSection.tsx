import { FieldForm } from "@/components/FieldForm"
import { Input } from "@/components/Input"
import { Option } from "@/components/Option"
import { SelectField } from "@/components/SelectField"
import { ISelectCoachingSection } from "@/interfaces/coaching/form-coaching/FormCoaching"

export function SelectSection({ creditor, operator, backOffice, currentDate, watch, register, errors }: ISelectCoachingSection) {

    return (
        <section>
            <h1 className={`black/80 text-lg font-medium text-center my-4 md:text-lg`}>
                ACOMPANHAMENTO IN-LOCO
            </h1>


            <div className={`flex flex-col lg:flex-row gap-2 font-medium text-black/90 shadow rounded-md p-4`}
            >
                <FieldForm
                    label="date"
                    name="Data:"
                    obrigatory={false}
                >
                    <Input
                        value={currentDate}
                        type="date"
                        id="date"
                        name="date"
                        disabled
                        required
                    />
                </FieldForm>

                <FieldForm
                    label="creditor"
                    name="Credor:"
                    error={errors.creditor && "Inválido"}
                >
                    <SelectField
                        name="creditor"
                        id="creditor"
                        styles={`h-11
                                ${errors.creditor ? "border-[--label-color-error] dark:border-[--label-color-error]" : ""}
                            `}
                        onForm={true}
                        value={watch("creditor")}
                        register={register}
                        required
                    >
                        <Option value={"0"} firstValue={"Selecione"} />

                        {creditor.map((company, i) => {
                            return (
                                <Option
                                    key={i}
                                    value={company.Id_Creditor}
                                    firstValue={company.Creditor}
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>

                <FieldForm
                    label="operator"
                    name="Operador:"
                    error={errors.operator && "Inválido"}
                >
                    <SelectField
                        name="operator"
                        id="operator"
                        styles={`h-11
                                ${errors.operator ? "border-[--label-color-error] dark:border-[--label-color-error]" : ""}
                            `}
                        onForm={true}
                        value={watch("operator")}
                        register={register}
                        required
                    >
                        <Option value={"0"} firstValue={"Selecione"} />

                        {operator.map((operator, i) => {
                            return (
                                <Option
                                    key={i}
                                    value={operator.Id_User}
                                    firstValue={operator.Name + " " + operator.Last_Name}
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>

                <FieldForm
                    label="backOffice"
                    name="Responsável:"
                    error={errors.backOffice && "Inválido"}
                >
                    <SelectField
                        name="backOffice"
                        id="backOffice"
                        styles={`h-11
                                ${errors.backOffice ? "border-[--label-color-error] dark:border-[--label-color-error]" : ""}
                            `}
                        onForm={true}
                        value={watch("backOffice")}
                        register={register}
                        required
                    >
                        <Option value={"0"} firstValue={"Selecione"} />

                        {backOffice.map((backOffice, i) => {
                            return (
                                <Option
                                    key={i}
                                    value={backOffice.Id_User}
                                    firstValue={backOffice.Name + " " + backOffice.Last_Name}
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>

                <FieldForm
                    label="reason"
                    name="Motivo:"
                    obrigatory={true}
                    error={errors.reason && "Inválido"}
                >
                    <SelectField
                        name="reason"
                        id="reason"
                        styles={`h-11 
                                ${errors.reason ? "border-[--label-color-error] dark:border-[--label-color-error]" : ""}
                            `}
                        onForm={true}
                        value={watch("reason")}
                        register={register}
                        required
                    >
                        <Option
                            value={"Selecione"}
                            firstValue={"Selecione"}
                        />

                        <Option
                            value={"SOLICITAÇÃO CREDOR"}
                            firstValue={"SOLICITAÇÃO CREDOR"}
                        />

                        <Option
                            value={"BAIXA REVERSÃO"}
                            firstValue={"BAIXA REVERSÃO"}
                        />

                        <Option
                            value={"BAIXA PERFORMANCE"}
                            firstValue={"BAIXA PERFORMANCE"}
                        />

                        <Option
                            value={"RETORNO DE FEEDBACK"}
                            firstValue={"RETORNO DE FEEDBACK"}
                        />

                        <Option
                            value={"RETORNO DE TREINAMENTO"}
                            firstValue={"RETORNO DE TREINAMENTO"}
                        />
                    </SelectField>
                </FieldForm>
            </div>
        </section>
    )
}