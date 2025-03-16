// useAuth.ts
import { ref, onMounted, onUnmounted } from "vue";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "~/services/firebase/firebaseConfig";

export const useAuth = () => {
  const user = ref<User | null>(null);

  onMounted(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
    });

    // Cleanup subscription when the component is unmounted
    onUnmounted(() => {
      unsubscribe();
    });
  });

  return { user };
};
