import { StatusIcon } from "@/constants/statusIcons";
import clsx from "clsx";
import Image from "next/image";



export const StatusBadge = ({ status }: { status: OrderStatusType }) => {
    return (
        <div
            className={clsx("flex w-fit items-center gap-2 rounded-full px-6 py-2", {
                "bg-green-100": status === "UPLOADED",
                "bg-sky-100": status === "PROCESSING",
                "bg-red-500": status === "CANCELLED",
                "bg-purple-100": status === "QUOTED",
                "bg-emerald-100": status === "ASSIGNED",
                "bg-lime-400": status === "REFUNDED",
                "bg-orange-400": status === 'REWORK'
            })}
        >
            <Image
                // @ts-ignore
                src={StatusIcon[status]}
                alt="doctor"
                width={24}
                height={24}
                className="h-fit w-3"
            />
            <p
                className={clsx("text-xs capitalize ", {
                    "text-green-500": status === "UPLOADED" || status === 'ASSIGNED',
                    "text-blue-500": status === "PROCESSING",
                    "text-white": status === "CANCELLED" || status === 'REFUNDED' || status === 'REWORK',
                    "text-purple-500": status === "QUOTED",
                })}
            >
                {status}
            </p>
        </div>
    );
};