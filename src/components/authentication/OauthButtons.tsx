import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const OauthButons = () => {

  const handleOAuthSignIn = async (provider: string) => {
    try {
      toast.loading(`Iniciando sesión con ${provider}...`);
      await signIn(provider, { callbackUrl: "/fill_information" });
    } catch (error) {
      console.error(`Error al iniciar sesión con ${provider}:`, error);
      toast.dismiss();
      toast.error("Ocurrió un error. Por favor, inténtalo de nuevo.");
    }
  };
  
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <Button
        type="button"
        variant="outline"
        className="flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
        onClick={() => handleOAuthSignIn("google")}
      >
        <FaGoogle className="text-red-500" />
        <span>Google</span>
      </Button>

      <Button
        type="button"
        variant="outline"
        className="flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
        onClick={() => handleOAuthSignIn("github")}
      >
        <FaGithub className="text-gray-800" />
        <span>GitHub</span>
      </Button>
    </div>
  );
};
