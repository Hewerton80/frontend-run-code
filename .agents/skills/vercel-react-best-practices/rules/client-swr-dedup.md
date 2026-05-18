---
title: Use TanStack Query for Automatic Deduplication
impact: MEDIUM-HIGH
impactDescription: automatic deduplication and caching
tags: client, tanstack-query, react-query, deduplication, data-fetching
---

## Use TanStack Query for Automatic Deduplication

TanStack Query deduplicates requests automatically: multiple components using the same query key share a single in-flight request and the same cached result.

**Incorrect (no deduplication, each instance fetches independently):**

```tsx
function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then(setUsers);
  }, []);
}
```

**Correct (multiple instances share one request via the same query key):**

```tsx
import { useQuery } from "@tanstack/react-query";

function UserList() {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then((r) => r.json()),
  });
}
```

Multiple instances of `UserList` will share a single in-flight request and the same cached data after resolution.

**For immutable/static data (never stale):**

```tsx
const { data } = useQuery({
  queryKey: ["config"],
  queryFn: fetchConfig,
  staleTime: Infinity, // never considered stale — no background refetch
});
```

**For mutations:**

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function UpdateButton() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
  return <button onClick={() => mutate()}>Update</button>;
}
```

Reference: [https://tanstack.com/query](https://tanstack.com/query)
