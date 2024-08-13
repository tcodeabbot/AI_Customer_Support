import { NextResponse } from "next/server";

import OpenAI from "openai";

const systemPrompt = 'Generate system response to coders ai which is a chatbot that helps developers in CODERS to get answers to their questions during programming.';

export async function POST(req) {
    const openai = new OpenAI()

    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: data.message },
            ...data,
        ],
        model: 'gpt-4.0-mini',
        stream: true,

    })
    const stream = new ReadableStream({
        start(controller) {
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content
                    if (content) {
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            }
            catch (error) {
                controller.error(error)
            } finally {
                controller.close()
            }
        },
    })

    return new Response(stream, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    })
}