function Heading({ as = "h1", children, className }) {
  switch (as) {
    case "h1":
      return (
        <h1 className={`text-3xl font-semibold ${className}`}>{children}</h1>
      );
    case "h2":
      return (
        <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
      );
    case "h3":
      return <h3 className={`font-semibold ${className}`}>{children}</h3>;
    default:
      return { children };
  }
}
export default Heading;
