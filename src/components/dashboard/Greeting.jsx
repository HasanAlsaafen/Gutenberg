export default function Greet() {
  return (
    <>
      <h1>
        Hello{" "}
        {localStorage
          .getItem("Name")
          .slice(0, localStorage.getItem("Name").indexOf("@"))}
      </h1>
    </>
  );
}
