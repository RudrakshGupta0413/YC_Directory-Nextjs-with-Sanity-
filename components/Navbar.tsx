import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import NavbarClient from './NavbarClient'; // Import the client component

const Navbar = async () => {
    const session = await getServerSession(authOptions); // Get the session

    return <NavbarClient session={session} />;
};

export default Navbar;