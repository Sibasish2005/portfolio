import { Certificate } from "node:crypto";
import {z} from "zod";
import { describe } from "zod/v4/core";


export const ExperienceSchema = z.object({
    company:z.string().nullable(),
    role:z.string().nullable(),
    duration:z.string().nullable(),
    description:z.string().nullable(),
    skillsUsed:z.array(z.string())
});
export const ResumeSchema = z.object({
    name:z.string().nullable(),
    email:z.string().nullable(),
    phone:z.string().nullable(),
    total_experience_years:z.number().nullable(),
    skills:z.array(z.string()),
    experience:z.array(ExperienceSchema),
    education:z.array(z.string()),
    project:z.array(z.string()),
    certifications:z.array(z.string()).optional(),

});

export type Resume = z.infer<typeof ResumeSchema>;