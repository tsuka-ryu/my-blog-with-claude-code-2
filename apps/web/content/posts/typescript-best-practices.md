---
title: 'TypeScript ベストプラクティス 2025'
description: 'プロダクション環境で使えるTypeScriptのベストプラクティスを紹介します。型安全性とパフォーマンスを両立させるための実践的なテクニック。'
date: '2025-01-10'
tags: ['TypeScript', 'JavaScript', 'ベストプラクティス', '型安全性']
category: 'プログラミング'
author: 'tsuka-ryu'
published: true
featured: false
image: '/images/typescript-best-practices.jpg'
slug: 'typescript-best-practices'
---

# TypeScript ベストプラクティス 2025

TypeScriptを効果的に活用するための実践的なテクニックとベストプラクティスを紹介します。

## 基本的な型定義

### 1. Interfaceとtype aliasの使い分け

**Interface** - 拡張可能なオブジェクト型に使用：

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

// 拡張可能
interface AdminUser extends User {
  permissions: string[];
}
```

**Type alias** - ユニオン型や計算された型に使用：

```typescript
type Status = 'loading' | 'success' | 'error';
type ApiResponse<T> = {
  data: T;
  status: Status;
  message?: string;
};
```

### 2. Utility Types の活用

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

// 部分的な更新用
type ProductUpdate = Partial<Product>;

// 必須フィールドのみ
type ProductRequired = Required<Pick<Product, 'name' | 'price'>>;

// IDを除外
type CreateProduct = Omit<Product, 'id'>;
```

## 関数型プログラミング

### 1. 型安全な関数定義

```typescript
// ジェネリクスを使った関数
function mapArray<T, U>(array: T[], mapper: (item: T, index: number) => U): U[] {
  return array.map(mapper);
}

// 使用例
const numbers = [1, 2, 3, 4, 5];
const doubled = mapArray(numbers, num => num * 2); // number[]
const strings = mapArray(numbers, num => num.toString()); // string[]
```

### 2. 条件付き型

```typescript
type ApiKey = string;
type AuthRequired<T> = T extends { requireAuth: true } ? T & { apiKey: ApiKey } : T;

interface PublicEndpoint {
  url: string;
  requireAuth: false;
}

interface PrivateEndpoint {
  url: string;
  requireAuth: true;
}

// 条件に応じて型が変化
type PublicApi = AuthRequired<PublicEndpoint>; // { url: string; requireAuth: false; }
type PrivateApi = AuthRequired<PrivateEndpoint>; // { url: string; requireAuth: true; apiKey: string; }
```

## エラーハンドリング

### 1. Result型パターン

```typescript
type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      return {
        success: false,
        error: new Error(`HTTP ${response.status}: ${response.statusText}`),
      };
    }

    const user = await response.json();
    return { success: true, data: user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

// 使用例
const result = await fetchUser('123');
if (result.success) {
  console.log(result.data.name); // 型安全
} else {
  console.error(result.error.message);
}
```

### 2. カスタムエラー型

```typescript
abstract class AppError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;
}

class ValidationError extends AppError {
  readonly code = 'VALIDATION_ERROR';
  readonly statusCode = 400;

  constructor(
    message: string,
    public readonly field: string
  ) {
    super(message);
  }
}

class NotFoundError extends AppError {
  readonly code = 'NOT_FOUND';
  readonly statusCode = 404;
}
```

## パフォーマンス最適化

### 1. 型レベルでの最適化

```typescript
// 遅い: 毎回計算
type SlowUnion = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j';

// 速い: 事前計算済み
const VALID_OPTIONS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'] as const;
type FastUnion = (typeof VALID_OPTIONS)[number];
```

### 2. 型ガード関数

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'email' in value
  );
}

// 使用例
function processValue(value: unknown) {
  if (isString(value)) {
    // value は string として扱われる
    console.log(value.toUpperCase());
  }

  if (isUser(value)) {
    // value は User として扱われる
    console.log(value.email);
  }
}
```

## 実践的なパターン

### 1. Builder パターン

```typescript
class QueryBuilder {
  private conditions: string[] = [];
  private orderBy: string[] = [];
  private limitValue?: number;

  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  order(field: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.orderBy.push(`${field} ${direction}`);
    return this;
  }

  limit(count: number): this {
    this.limitValue = count;
    return this;
  }

  build(): string {
    let query = 'SELECT * FROM users';

    if (this.conditions.length > 0) {
      query += ` WHERE ${this.conditions.join(' AND ')}`;
    }

    if (this.orderBy.length > 0) {
      query += ` ORDER BY ${this.orderBy.join(', ')}`;
    }

    if (this.limitValue) {
      query += ` LIMIT ${this.limitValue}`;
    }

    return query;
  }
}

// 使用例
const query = new QueryBuilder()
  .where('age > 18')
  .where('status = "active"')
  .order('created_at', 'DESC')
  .limit(10)
  .build();
```

### 2. State Machine パターン

```typescript
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface StateMachine<T> {
  state: LoadingState;
  data?: T;
  error?: Error;
}

class AsyncState<T> {
  private machine: StateMachine<T> = { state: 'idle' };

  get current(): StateMachine<T> {
    return { ...this.machine };
  }

  loading(): void {
    this.machine = { state: 'loading' };
  }

  success(data: T): void {
    this.machine = { state: 'success', data };
  }

  error(error: Error): void {
    this.machine = { state: 'error', error };
  }

  reset(): void {
    this.machine = { state: 'idle' };
  }
}
```

## まとめ

TypeScriptの力を最大限に活用するには：

1. **適切な型定義**: InterfaceとType aliasを使い分ける
2. **Utility Types活用**: 既存の型から新しい型を生成
3. **エラーハンドリング**: Result型やカスタムエラーで型安全性を保つ
4. **パフォーマンス**: 型レベルでの最適化を意識
5. **実践的パターン**: BuilderやState Machineで保守性向上

これらのベストプラクティスを活用して、より安全で保守性の高いコードを書きましょう。
