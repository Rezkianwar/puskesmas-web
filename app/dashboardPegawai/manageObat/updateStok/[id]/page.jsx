import UpdateStokObat from "../page";
import { fetchManageObat } from "../../../../lib/service/manageObatService";

const UpdateStokPage = async ({ params }) => {
  const { id } = params;
  const manageObat = await fetchManageObat(id);

  if (!manageObat) {
    return <div>Obat tidak ditemukan</div>;
  }

  return <UpdateStokObat obat={manageObat} />;
};

export default UpdateStokPage;
