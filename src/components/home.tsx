// import DashboardLayout from "./dashboard/DashboardLayout";

// function Home() {
//   return (
//     <div className="w-screen h-screen">
//       <DashboardLayout />
//     </div>
//   );
// }

// export default Home;

import { User } from '@supabase/supabase-js';
import DashboardLayout from "./dashboard/DashboardLayout";
import { useEffect } from 'react';
import useConversations from '../hooks/useConversations';

interface HomeProps {
  user: User;
  signOut: () => Promise<void>;
}

function Home({ user, signOut }: HomeProps) {
  const { 
    conversations, 
    currentConversation,
    newConversation,
    setCurrentConversation
  } = useConversations(user?.id);

  // Create a default conversation if none exists
  useEffect(() => {
    const createInitialConversation = async () => {
      if (conversations.length === 0) {
        await newConversation('Welcome Conversation');
      }
    };

    if (user) {
      createInitialConversation();
    }
  }, [user, conversations.length, newConversation]);

  return (
    <div className="w-screen h-screen">
      <DashboardLayout 
        user={user}
        signOut={signOut}
        conversations={conversations}
        currentConversation={currentConversation}
        setCurrentConversation={setCurrentConversation}
        newConversation={newConversation}
      />
    </div>
  );
}

export default Home;
