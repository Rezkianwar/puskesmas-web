import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <SignUp
        path="/sign-up"
        appearance={{
          elements: {
            rootBox: {
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "50px 0",
            },
            formButtonPrimary: {
              backgroundColor: "#5755eb",
            },
          },
        }}
      />
    </div>
  );
}
