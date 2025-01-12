"use client";
import { Button } from "@/components/ui/button";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router: AppRouterInstance = useRouter();

  const GoBack = () => {
    router.back();
  };

  return (
    <section
      style={styles.mainContainer}
      className="h-screen w-screen bg-black-2 text-white flex justify-center align-middle"
    >
      <div style={styles.container}>
        <h1 style={styles.heading}>404 - Page Not Found</h1>
        <p style={styles.description}>
          Oops! The page you&lsquo;re looking for doesn&apos;t exist.
        </p>
        <Button onClick={GoBack} className=" bg-green-400 w-[250px] p-7">
          Go Back
        </Button>
      </div>
    </section>
  );
}

// Simple inline styles
const styles: { [key: string]: React.CSSProperties } = {
  mainContainer: {
    alignContent: "center",
    alignItems: "center",
  },
  container: {
    textAlign: "center",
    padding: "4rem",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
  description: {
    fontSize: "1.2rem",
    margin: "1rem 0",
  },
  link: {
    color: "blue",
    textDecoration: "underline",
    fontSize: "1.2rem",
  },
};
