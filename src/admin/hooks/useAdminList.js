import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Everything a paginated admin list needs, in one place.
 *
 * Coaches, guests, subscriptions and the audit log all need the same five
 * things: debounced search, filters, a page, the four load states, and a
 * refresh after a mutation. Each screen had its own copy of that, which is how
 * they drift — one gets a retry button, another forgets the empty state.
 *
 *   const list = useAdminList(adminApi.listCoaches, { status: 'all' });
 *   list.items / list.total / list.loading / list.error / list.reload
 *   list.query / list.setQuery          (debounced for you)
 *   list.filters / list.setFilter(k,v)  (resets to page 1)
 *
 * `fetcher` is called as fetcher({ page, pageSize, q, ...filters }).
 */
export function useAdminList(fetcher, initialFilters = {}, { pageSize = 25 } = {}) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filters, setFilters] = useState(initialFilters);

  // Keeps the fetcher out of the reload dependency list, so callers can pass an
  // inline arrow without causing an infinite refetch loop.
  const fetcherRef = useRef(fetcher);
  useEffect(() => { fetcherRef.current = fetcher; }, [fetcher]);

  // One request per pause in typing, not one per keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filterKey = JSON.stringify(filters);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetcherRef.current({
        page, pageSize, q: debouncedQuery, ...JSON.parse(filterKey),
      });
      setItems(data?.items || []);
      setTotal(data?.total || 0);
    } catch (err) {
      setError(err?.message || 'Could not load this list.');
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, debouncedQuery, filterKey]);

  useEffect(() => {
    let active = true;
    // Guard the write: a slow response from a previous page must not overwrite
    // the current one when the user pages quickly.
    (async () => { if (active) await load(); })();
    return () => { active = false; };
  }, [load]);

  const setFilter = useCallback((key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  }, []);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const isFiltered = useMemo(
    () => !!debouncedQuery || Object.values(filters).some((v) => v && v !== 'all'),
    [debouncedQuery, filters],
  );

  return {
    items, total, page, setPage, totalPages, pageSize,
    loading, error, reload: load,
    query, setQuery, debouncedQuery,
    filters, setFilter, isFiltered,
  };
}
