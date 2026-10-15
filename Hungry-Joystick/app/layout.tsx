import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Hungry Joystick · Café Manager',description:'Run your gaming floor, track sessions and manage café billing.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
