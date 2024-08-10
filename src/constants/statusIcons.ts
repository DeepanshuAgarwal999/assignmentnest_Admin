import cancelledIcon from "../../public/icons/cancelled.svg";
import pendingIcon from "../../public/icons/pending.svg";
import uploadedIcon from "../../public/icons/check.svg";
import quotedIcon from "../../public/icons/quoted.svg";
import assignedIcon from "../../public/icons/assigned.svg";
import refundedIcon from "../../public/icons/refunded.svg";

export const StatusIcon = {
  UPLOADED: uploadedIcon,
  COMPLETED: uploadedIcon,
  PROCESSING: pendingIcon,
  CANCELLED: cancelledIcon,
  QUOTED: quotedIcon,
  ASSIGNED: assignedIcon,
  REFUNDED: refundedIcon,
};
