"use client";

import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    const currentQuery = searchParams.get("query");
    setQuery(currentQuery !== null ? currentQuery : "");
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((e) => {
    const term = e.target.value;
    const params = new URLSearchParams(searchParams);

    params.set("page", 1);

    if (term) {
      term.length > 1 && params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params}`);
  }, 200);

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e);
        }}
        placeholder="Search..."
        className={styles.input}
        value={query}
      />
    </div>
  );
};

export default Search;
