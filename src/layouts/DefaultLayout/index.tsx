import { Outlet } from 'react-router-dom';
import { AppContainer } from '../../components/AppContainer';

export function DefaultLayout() {
  return (
    <>
      <AppContainer>
        <Outlet />
      </AppContainer>
    </>
  );
}
