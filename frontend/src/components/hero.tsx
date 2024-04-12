import deal from "@/assets/deal.svg";
import { StarFilledIcon } from "@radix-ui/react-icons";

const Hero = () => {
  return (
    <div className="flex flex-col items-start justify-start w-[90vw] xl:w-[78vw] h-screen ">
      <div className="flex flex-row w-full items-center justify-center pt-24">
        <div className="flex flex-col w-full h-full items-start justify-start gap-6 mt-10">
          <div className="flex flex-row items-center justify-between px-6 w-[360px] h-10 bg-ribbon-100 rounded-full border border-ribbon-600">
            <StarFilledIcon className="w-5 h-5 text-yellow-500" />
            <p className="text-ribbon-600 font-bold">
              Campeã em plano de carreira
            </p>
            <StarFilledIcon className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-ribbon-950 text-4xl xl:text-5xl font-bold leading-tight xl:leading-tight">
            <span className="text-ribbon-600">Oportunidades</span>{" "}
            de ouro para iniciar sua{" "}
            <span className="text-ribbon-600">jornada</span> profissional.
          </p>
          <p className="max-w-[410px] xl:max-w-[500px] 2xl:max-w-[660px] text-slate-400">
            Descubra oportunidades para a area que esta procurando, seja recem
            formado ou graduado. Apresentamos inúmeras vagas de
            empresas que parceiras que buscam formar ótimos profissionais.
          </p>
          <div className="flex flex-row gap-4 w-full">

          <button className="flex rounded-full font-semibold text-white py-2 px-6 max-w-[176px] bg-ribbon-600 hover:bg-ribbon-700 transition-colors ">
        Buscar Empregos
      </button>
      <button className="flex rounded-full font-semibold items-center justify-center text-ribbon-950 py-2 px-6 w-full max-w-[176px] bg-transparent border border-divider hover:bg-gray-100 transition-colors ">
        Planos
      </button>
          </div>
      
        </div>
        <div className="flex w-full items-center justify-center">
          <img src={deal} alt="logo" className="w-auto h-64 xl:-mt-0 xl:h-96" />
        </div>
      </div>
    </div>
  );
};
export default Hero;