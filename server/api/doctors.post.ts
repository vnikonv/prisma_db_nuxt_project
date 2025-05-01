import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event)=>  {
    let doctor = null
    const body = await readBody(event)

    if (body.doctor_id) {
        doctor = await event.context.prisma.doctors.create(
            {
                data: {
                    doctor_id: body.doctor_id,
                    doctor_name: body.doctor_name,
                    profile: body.profile,
                    schedule: body.schedule,
                    salary: body.salary
                }
            }
        )
    }

    return {
        user: doctor
    }
})