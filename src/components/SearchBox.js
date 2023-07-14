const SearchBox = ({ search, setSearch, placeholder }) => {
  return (
    <div className="relative">
      <input
        type="text"
        className="outline-none h-full w-[385px] rounded-lg border border-solid border-gray-300 px-12 font-inter leading-6 placeholder:text-[#637381] placeholder:opacity-50"
        placeholder={placeholder}
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
      />
      <img src="/images/icons/magnifying.svg" alt="" className="absolute top-1/2 -translate-y-1/2 left-6" />
    </div>
  );
};

export default SearchBox;
