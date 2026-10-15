import Manager from './manager';
import {requireChatGPTUser} from './chatgpt-auth';
export const dynamic='force-dynamic';
export default async function Page(){const user=await requireChatGPTUser('/');return <Manager owner={{name:user.fullName??user.displayName,email:user.email}}/>;}
