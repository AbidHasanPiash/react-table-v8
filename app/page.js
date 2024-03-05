import BasicTable from "@/components/table/BasicTable";
import ExpandRowTable from "@/components/table/ExpandRowTable";

export default function Home() {
  return (
    <main className="p-20 h-screen overflow-hidden bg-hero bg-no-repeat bg-fixed bg-cover">
      <div className="h-full w-full border-4 bg-white/30 backdrop-blur-xl 
      border-blue-400 overflow-auto rounded-2xl scrollbar scrollbar-thumb-sky-500">
        <ExpandRowTable/>
        {/* <BasicTable/> */}
      </div>
    </main>
  );
}
