import { IInputRadioForm } from "@/interfaces/components/InputRadioForm";

export function InputRadioForm({ answer }: IInputRadioForm) {

    return (
        <div
            className={answer == true
                ? "w-4 h-4 rounded-full border-[1px] print:border-zinc-700 border-blue-500 dark:border-sky-500 flex justify-center items-center"
                : "w-4 h-4 border-gray-500 border-[1px] rounded-full dark:border-white"}
            >
            <div
                className={answer == true ? "w-[10px] h-[10px] print:bg-zinc-700 bg-blue-500 dark:bg-sky-500 rounded-full" : ""}
            ></div>
        </div>
    )

}
