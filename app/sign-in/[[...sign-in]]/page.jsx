import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      path="/sign-in"
      appearance={{
        elements: {
          rootBox: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "100px 0px",
          },
          formButtonPrimary: {
            backgroundColor: "#5755eb",
          },
        },
      }}
    />
  );
}
