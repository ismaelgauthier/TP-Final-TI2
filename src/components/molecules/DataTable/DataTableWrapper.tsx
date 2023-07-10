import { useRouter } from 'next/navigation';
import DataTable from './DataTable';

export default function DataTableWrapper() {
  const navigation = useRouter();

  const handleRowClick = (params) => {
    const { productName } = params.row;
    navigation.push(`/product/${productName}`);
  };

  return <DataTable onRowClick={handleRowClick} />;
}
