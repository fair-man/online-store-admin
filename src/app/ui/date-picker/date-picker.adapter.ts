export abstract class UIDatePickerAdapter<D> {
  abstract fromMilliseconds(milliseconds: number): D;

  abstract toMilliseconds(value: D | null): number | null;
}
