import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from '@/src/types/usuario';

const USER_KEY = '@zenflow:user';
const USER_ID_KEY = '@zenflow:userId';

/**
 * Salva o usuário logado no armazenamento local
 */
export async function saveUser(user: Usuario): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    await AsyncStorage.setItem(USER_ID_KEY, user.id.toString());
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    throw error;
  }
}

/**
 * Recupera o usuário logado do armazenamento local
 */
export async function getUser(): Promise<Usuario | null> {
  try {
    const userJson = await AsyncStorage.getItem(USER_KEY);
    if (!userJson) return null;
    return JSON.parse(userJson) as Usuario;
  } catch (error) {
    console.error('Erro ao recuperar usuário:', error);
    return null;
  }
}

/**
 * Recupera apenas o ID do usuário logado
 */
export async function getUserId(): Promise<number | null> {
  try {
    const userIdStr = await AsyncStorage.getItem(USER_ID_KEY);
    if (!userIdStr) return null;
    return parseInt(userIdStr, 10);
  } catch (error) {
    console.error('Erro ao recuperar ID do usuário:', error);
    return null;
  }
}

/**
 * Remove o usuário do armazenamento local (logout)
 */
export async function removeUser(): Promise<void> {
  try {
    await AsyncStorage.removeItem(USER_KEY);
    await AsyncStorage.removeItem(USER_ID_KEY);
  } catch (error) {
    console.error('Erro ao remover usuário:', error);
    throw error;
  }
}

/**
 * Verifica se há um usuário logado
 */
export async function isLoggedIn(): Promise<boolean> {
  const user = await getUser();
  return user !== null;
}

