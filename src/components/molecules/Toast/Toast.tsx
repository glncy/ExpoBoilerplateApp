import { Portal } from "@rn-primitives/portal";
import { isValidElement, ReactNode, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ToastItem from "@/src/components/molecules/Toast/ToastItem";
import {
  ToastItemType,
  toastManager,
  AddToastOptions,
} from "@/src/components/molecules/Toast/ToastManager";
import { isObject, isString } from "lodash";

type ToastFunctionArgs =
  | [ReactNode]
  | [ReactNode, string]
  | [ReactNode, AddToastOptions]
  | [string, ReactNode, AddToastOptions];

const toast = (...args: ToastFunctionArgs) => {
  let title: string | undefined;
  let message: ReactNode;
  let options: AddToastOptions | undefined;

  if (args.length === 1) {
    message = args[0];
  } else if (args.length === 2) {
    if (isString(args[0]) && isValidElement(args[1])) {
      [title, message] = args;
    } else if (!isObject(args[1])) {
      [message] = args;
    } else {
      [message, options] = args;
    }
  } else {
    [title, message, options] = args;
  }

  return toastManager.addToast({ title, message }, options);
};

const subToast = (args: ToastFunctionArgs, options: AddToastOptions) => {
  if (args.length === 2 && isString(args[0]) && isString(args[1])) {
    return toast(args[0], args[1], options);
  }

  if (args.length === 2 && isValidElement(args[1])) {
    return toast(args[1], options);
  }

  if (args.length === 2 && isObject(args[1])) {
    return toast(args[0], {
      ...args[1],
      ...options,
    });
  }

  if (args.length === 3) {
    return toast(args[0], args[1], {
      ...args[2],
      ...options,
    });
  }

  // args.length === 1
  return toast(args[0], options);
};

// Info toast
toast.info = (...args: ToastFunctionArgs) => {
  const options: AddToastOptions = { type: "info" };
  return subToast(args, options);
};
// Warning toast
toast.warning = (...args: ToastFunctionArgs) => {
  const options: AddToastOptions = { type: "warning" };
  return subToast(args, options);
};
// Success toast
toast.success = (...args: ToastFunctionArgs) => {
  const options: AddToastOptions = { type: "success" };
  return subToast(args, options);
};
// Error toast
toast.error = (...args: ToastFunctionArgs) => {
  const options: AddToastOptions = { type: "error" };
  return subToast(args, options);
};
// Loading toast
toast.loading = (...args: ToastFunctionArgs) => {
  const options: AddToastOptions = { type: "loading", autoDismiss: false };
  return subToast(args, options);
};
// remove toast function
toast.remove = (toast: ToastItemType | number) => {
  if (isObject(toast)) {
    toastManager.removeToast(toast.id);
    return;
  }
  toastManager.removeToast(toast);
};
toast.removeAll = () => {
  toastManager.removeAllToasts();
};
export { toast };

const useToastManager = () => {
  const [toasts, setToasts] = useState<ToastItemType[]>([]);

  useEffect(() => {
    const listener = (newToasts: ToastItemType[]) => {
      setToasts(newToasts);
    };
    toastManager.addListener(listener);

    return () => {
      toastManager.removeListener(listener);
    };
  }, []);

  return toasts;
};

interface ToastComponentProps {
  toasts: ToastItemType[];
  portalHost?: string;
}

const ToastComponet = (props: ToastComponentProps) => {
  return (
    <Portal
      name={`${props.portalHost ?? "general"}-toast`}
      hostName={props.portalHost}
    >
      <GestureHandlerRootView className="absolute w-full gap-4 mt-safe px-6 pt-10">
        {props.toasts.map((toastItem) => (
          <ToastItem key={`toast-id-${toastItem.id}`} toast={toastItem} />
        ))}
      </GestureHandlerRootView>
    </Portal>
  );
};

interface ToastProps {
  // You can add props here if needed
}

const Toast = (props: ToastProps) => {
  const toasts = useToastManager();
  const portalHosts = toasts
    .filter((toast) => toast.portalHost)
    .map((toast) => toast.portalHost);
  const uniquePortalHosts = Array.from(new Set(portalHosts));

  return (
    <>
      <ToastComponet toasts={toasts.filter((toast) => !toast.portalHost)} />
      {uniquePortalHosts.map((portalHost) => (
        <ToastComponet
          key={`toast-portal-${portalHost}`}
          toasts={toasts.filter((toast) => toast.portalHost === portalHost)}
          portalHost={portalHost}
        />
      ))}
    </>
  );
};

export default Toast;
