---
title: 'React Hooksのベストプラクティス'
description: 'React Hooksを効果的に使用するためのパターンとアンチパターンを解説します。'
date: '2024-01-15'
tags: ['React', 'JavaScript', 'Frontend']
category: 'Technology'
author: 'tsuka-ryu'
published: true
featured: false
slug: 'react-hooks-best-practices'
---

# React Hooksのベストプラクティス

React Hooksを効果的に使用するためのパターンとアンチパターンについて詳しく解説します。

## useState のベストプラクティス

### 1. 状態の構造化

複数の関連する状態変数は、オブジェクトとしてまとめることを検討しましょう。

```typescript
// ❌ 良くない例
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');

// ✅ 良い例
const [user, setUser] = useState({
  firstName: '',
  lastName: '',
  email: '',
});
```

### 2. 関数型アップデート

前の状態に基づいて更新する場合は、関数型アップデートを使用します。

```typescript
// ❌ 良くない例
const [count, setCount] = useState(0);
const increment = () => setCount(count + 1);

// ✅ 良い例
const [count, setCount] = useState(0);
const increment = () => setCount(prev => prev + 1);
```

## useEffect のベストプラクティス

### 1. 依存配列の管理

useEffectの依存配列は正確に指定しましょう。

```typescript
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await api.getUser(userId);
      setUser(userData);
    }

    fetchUser();
  }, [userId]); // userIdが変更されたときのみ実行

  return <div>{user?.name}</div>;
}
```

### 2. クリーンアップ関数

副作用のクリーンアップを忘れずに実装します。

```typescript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer tick');
  }, 1000);

  // クリーンアップ関数
  return () => {
    clearInterval(timer);
  };
}, []);
```

## useCallback と useMemo

### パフォーマンス最適化のタイミング

```typescript
function ExpensiveComponent({ items, onItemClick }: Props) {
  // 計算量の多い処理はuseMemoでメモ化
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  // コールバック関数はuseCallbackでメモ化
  const handleClick = useCallback((id: string) => {
    onItemClick(id);
  }, [onItemClick]);

  return (
    <div>
      <p>Total: {expensiveValue}</p>
      {items.map(item => (
        <Item
          key={item.id}
          item={item}
          onClick={handleClick}
        />
      ))}
    </div>
  );
}
```

## カスタムHooks

### 1. ロジックの再利用

共通のロジックはカスタムHooksに抽出します。

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

### 2. 非同期処理の管理

```typescript
function useAsync<T>(asyncFunction: () => Promise<T>, dependencies: any[] = []) {
  const [state, setState] = useState<{
    loading: boolean;
    data: T | null;
    error: Error | null;
  }>({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    setState({ loading: true, data: null, error: null });

    asyncFunction()
      .then(data => setState({ loading: false, data, error: null }))
      .catch(error => setState({ loading: false, data: null, error }));
  }, dependencies);

  return state;
}
```

## アンチパターン

### 1. useEffectの誤用

```typescript
// ❌ 良くない例：不要なuseEffect
function BadExample({ name }: { name: string }) {
  const [uppercaseName, setUppercaseName] = useState('');

  useEffect(() => {
    setUppercaseName(name.toUpperCase());
  }, [name]);

  return <div>{uppercaseName}</div>;
}

// ✅ 良い例：計算結果を直接使用
function GoodExample({ name }: { name: string }) {
  const uppercaseName = name.toUpperCase();
  return <div>{uppercaseName}</div>;
}
```

### 2. 依存配列の省略

```typescript
// ❌ 良くない例：依存配列を省略
useEffect(() => {
  console.log(count);
}); // 毎回実行される

// ✅ 良い例：適切な依存配列
useEffect(() => {
  console.log(count);
}, [count]); // countが変更されたときのみ実行
```

## パフォーマンス最適化

### React.memo の活用

```typescript
const MemoizedComponent = React.memo(function ExpensiveComponent({
  data,
  onAction
}: Props) {
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  // カスタム比較関数（必要に応じて）
  return prevProps.data === nextProps.data;
});
```

### useTransition（React 18+）

```typescript
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);

    startTransition(() => {
      // 重い処理を非緊急更新として扱う
      const filteredResults = largeDataSet.filter(item =>
        item.name.toLowerCase().includes(newQuery.toLowerCase())
      );
      setResults(filteredResults);
    });
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {isPending && <div>検索中...</div>}
      <ResultsList results={results} />
    </div>
  );
}
```

## まとめ

React Hooksを効果的に使用するためには：

1. **適切な状態管理**: 関連する状態をまとめ、関数型アップデートを活用
2. **useEffectの正しい使用**: 依存配列を正確に指定し、クリーンアップを忘れずに
3. **パフォーマンス最適化**: useCallback、useMemo、React.memoを適切に使用
4. **カスタムHooks**: 共通ロジックを抽出して再利用性を向上
5. **アンチパターンの回避**: 不要なuseEffectや誤った依存配列を避ける

これらのベストプラクティスを活用して、保守性が高く効率的なReactアプリケーションを構築しましょう。
