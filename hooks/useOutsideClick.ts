import { onMounted, onBeforeUnmount, type Ref } from "vue";

export const useOutsideClick = (
  ref: Ref<HTMLElement | null>,
  onOutsideClick: () => void,
  isActive: boolean = true,
  trigger: keyof HTMLElementEventMap = "mouseup"
): void => {
  const clickHandler = (e: Event): void => {
    if (!isActive || !ref.value || ref.value.contains(e.target as Node)) {
      return;
    }
    onOutsideClick();
  };

  onMounted(() => {
    document.addEventListener(trigger, clickHandler);
  });

  onBeforeUnmount(() => {
    document.removeEventListener(trigger, clickHandler);
  });
};
