import { db } from './index.ts';
import { serviceBookings, workspaceActions } from './schema.ts';
import { eq, and, desc } from 'drizzle-orm';

export async function getServiceBookings(userUid: string) {
  try {
    return await db.select()
      .from(serviceBookings)
      .where(eq(serviceBookings.userId, userUid))
      .orderBy(desc(serviceBookings.createdAt));
  } catch (error) {
    console.error("Erro ao carregar agendamentos:", error);
    throw new Error("Erro ao consultar agendamentos.", { cause: error });
  }
}

export async function createServiceBooking(userUid: string, serviceName: string, scheduledAt: string, details?: string) {
  try {
    const result = await db.insert(serviceBookings)
      .values({
        userId: userUid,
        serviceName,
        scheduledAt,
        details,
        status: 'Pendente'
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    throw new Error("Erro ao criar agendamento.", { cause: error });
  }
}

export async function deleteServiceBooking(bookingId: number, userUid: string) {
  try {
    const result = await db.delete(serviceBookings)
      .where(and(
        eq(serviceBookings.id, bookingId),
        eq(serviceBookings.userId, userUid)
      ))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Erro ao excluir agendamento:", error);
    throw new Error("Erro ao excluir agendamento.", { cause: error });
  }
}

export async function createWorkspaceAction(userUid: string, actionType: string, description: string) {
  try {
    const result = await db.insert(workspaceActions)
      .values({
        userId: userUid,
        actionType,
        description
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error("Erro ao registrar log de workspace:", error);
    throw new Error("Erro ao registrar ação.", { cause: error });
  }
}

export async function getWorkspaceActions(userUid: string) {
  try {
    return await db.select()
      .from(workspaceActions)
      .where(eq(workspaceActions.userId, userUid))
      .orderBy(desc(workspaceActions.createdAt))
      .limit(30);
  } catch (error) {
    console.error("Erro ao carregar histórico de ações:", error);
    throw new Error("Erro ao consultar logs de ações.", { cause: error });
  }
}
