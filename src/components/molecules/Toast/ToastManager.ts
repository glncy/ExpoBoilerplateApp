import Icon, { IconList } from "@/src/components/atoms/Icon";
import { ComponentProps, ReactNode } from "react";
import { Pressable, View } from "react-native";
import { Text } from "@/src/components/reusables/ui/text";
import { Timer } from "@/src/utils/Timer";

type PressableProps = Partial<ComponentProps<typeof Pressable>>;
type ViewProps = Partial<ComponentProps<typeof View>>;
type TextProps = Partial<ComponentProps<typeof Text>>;
type IconProps = Partial<ComponentProps<typeof Icon>>;

interface ToastArgs {
  title?: string;
  message: ReactNode;
}

type Component<T extends ViewProps | TextProps | IconProps> = {
  style?: T["style"];
  className?: T["className"];
  props?: T;
};

export interface ToastItemType extends ToastArgs {
  /**
   * Unique id of the toast
   */
  id: number;
  /**
   * Type of the toast
   */
  type: ToastType;
  /**
   * Timestamp of the toast
   */
  timestamp: number;
  /**
   * Timer to dismiss the toast
   */
  timer: Timer;
  /**
   * Whether the toast can be dismissed
   */
  canDismiss: boolean;
  /**
   * Icon to display on the toast
   */
  icon?: ReactNode | keyof typeof IconList;
  /**
   * Container style
   */
  style?: ViewProps["style"] & PressableProps["style"];
  /**
   * Container className
   */
  className?: ViewProps["className"] & PressableProps["className"];
  /**
   * Container containerProps
   */
  props?: ViewProps & PressableProps;
  /**
   * Body (message and title) style, className, and containerProps
   */
  _body?: Component<ViewProps>;
  /**
   * Message style, className, and containerProps
   */
  _message?: Component<TextProps>;
  /**
   * Title style, className, and containerProps
   */
  _title?: Component<TextProps>;
  /**
   * Icon style, className, and containerProps
   */
  _icon?: Component<IconProps>;
  /**
   * On press handler
   */
  onPress?: () => void;
  /**
   * portalHost container
   */
  portalHost?: string;
}

type ToastType =
  | "default"
  | "info"
  | "warning"
  | "success"
  | "error"
  | "loading";

type AddToastExtend = Omit<
  ToastItemType,
  "id" | "title" | "message" | "timestamp" | "timeout"
>;

export interface AddToastOptions extends Partial<AddToastExtend> {
  duration?: number;
  autoDismiss?: boolean;
}

const defaultToastDuration = 5000;

class ToastManager {
  private listeners: Array<(toasts: ToastItemType[]) => void> = [];
  private toasts: ToastItemType[] = [];
  private nextId = 0;

  addListener(listener: (toasts: ToastItemType[]) => void) {
    this.listeners.push(listener);
    listener(this.toasts); // Immediately provide the current state
  }

  removeListener(listener: (toasts: ToastItemType[]) => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  addToast({ title, message }: ToastArgs, options?: AddToastOptions) {
    const {
      type: _type,
      duration: _duration,
      autoDismiss: _autoDismiss,
      canDismiss: _canDismiss,
      ...optionsRest
    } = options ?? {};
    let type: ToastType = _type ?? "default";
    let duration = _duration ?? defaultToastDuration;
    let autoDismiss = _autoDismiss ?? true;
    let canDismiss = _canDismiss ?? true;

    if (options) {
      type = options.type ?? type;
      duration = options.duration ?? duration;
      autoDismiss = options.autoDismiss ?? autoDismiss;
      canDismiss = options.canDismiss ?? canDismiss;
    }

    if (this.toasts.length > 0) {
      const currentTimestamp = Date.now();
      // get the last toast
      const prevToast = this.toasts[this.toasts.length - 1];
      // get timestamp of the last toast
      const prevToastDuration = prevToast.timestamp;
      // get the difference between the current toast and the last toast
      const timeDifference = currentTimestamp - prevToastDuration;
      // compute delay
      const delay = 1000 - timeDifference;
      duration += delay;
    }

    const newToastId = this.nextId++;

    let timer: Timer = new Timer(() => {}, 0);
    if (autoDismiss) {
      timer = new Timer(() => this.removeToast(newToastId), duration);
    }

    const newToast: ToastItemType = {
      id: newToastId,
      title,
      message,
      type,
      timestamp: Date.now(),
      timer,
      canDismiss,
      ...optionsRest,
    };

    this.toasts = [...this.toasts, newToast];
    this.notifyListeners();

    return newToast;
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notifyListeners();
  }

  removeAllToasts() {
    this.toasts = [];
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }
}

export const toastManager = new ToastManager();
