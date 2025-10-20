import { useEffect, useState } from "react"
import MessageCard from "./MessageCard"
import { fetchMessages } from "../api/api"
import MessageField from "./MessageField"
import { useUserStore } from "../store/store"
import { useMessagesStore } from "../store/useMessageStore"

const Feed = () => {
    const {messages, getMessages} = useMessagesStore()
    const { jwt } = useUserStore()

    useEffect(() => {
        const handleFetch = async () => {
            try {
               getMessages()
            } catch (err) {
                console.error(err)
            }
        }
        handleFetch()
    }, [])

    return (
        <>
            {jwt && <MessageField />}
            <div className="messages-section">
                <div className="container">
                    <h2 className="section-title">Последние сообщения</h2>
                    <div className="messages-grid">
                        {messages &&
                            messages.map((message) => (
                                <MessageCard key={message.id} {...message} />
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feed
