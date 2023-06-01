import Files from '@/components/views/super-admin/Library/Files';
import { useGetAllFiles } from '@/server/library';

export default function TeacherLibrary() {
  const { data, error, isLoading } = useGetAllFiles();
  return <Files data={data} isLoading={isLoading} variant='primary' />;
}
