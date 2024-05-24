function Heading({ as, children }) {
  console.log(as, children);
  switch (as) {
    case "h1":
      return <h1 className="text-3xl font-semibold">{children}</h1>;
    case "h2":
      return <h2 className="text-xl">{children}</h2>;
    case "h3":
      return <h3 className="text-lg">{children}</h3>;
    default:
      return { children };
  }
}
export default Heading;
