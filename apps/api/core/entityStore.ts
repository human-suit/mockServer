export interface BaseEntity {
  id: number;
}

export class EntityStore<T extends BaseEntity> {
  private items: T[];
  private lastId: number;

  constructor(initialData: T[] = []) {
    this.items = [...initialData];

    if (initialData.length > 0) {
      this.lastId = initialData[initialData.length - 1].id;
    } else {
      this.lastId = 0;
    }
  }

  findAll(): T[] {
    return [...this.items];
  }

  findById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  create(data: Omit<T, "id">): T {
    const newItem: T = {
      ...data,
      id: ++this.lastId,
    } as T;

    this.items.push(newItem);
    return newItem;
  }

  update(id: number, data: Partial<Omit<T, "id">>): T | undefined {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return undefined;
    }

    const updated: T = {
      ...this.items[index],
      ...data,
    };

    this.items[index] = updated;
    return updated;
  }

  delete(id: number): boolean {
    const before = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    return this.items.length < before;
  }
}
