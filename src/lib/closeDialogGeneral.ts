import { useEffect } from "react";
import type { Ref } from "react";

const useCloseDialogOnOutsideClick = (ref: Ref<HTMLDialogElement>) => {
  if (ref && typeof ref !== "function") {
    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (ref.current && e.target === ref.current) {
          ref.current.close();
        }
      };

      const dialogEl = ref.current;
      dialogEl?.addEventListener("click", handleOutsideClick);

      return () => {
        dialogEl?.removeEventListener("click", handleOutsideClick);
      };
    }, [ref]);
  }
};

export default useCloseDialogOnOutsideClick;
