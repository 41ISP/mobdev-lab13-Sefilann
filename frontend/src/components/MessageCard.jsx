import { deleteMessage, likeMessage, reportMessage } from "../api/api"
import { useUserStore } from "../store/store"
import { useMessagesStore } from "../store/useMessageStore"

const MessageCard = ({ content, createdAt, username, userId, id, likes,likeBy }) => {
    const loggedUserId = useUserStore((state) => state.jwt.userId)
    const {getMessages} = useMessagesStore()
    
        const handelDelete = async () =>{
    try {      
        await deleteMessage(id)
        await getMessages()
    } catch (error) {
        console.error(error)
    }
    
    }

    const handleReport = async () => {
        try {
            await reportMessage(id)
            await getMessages()
        } catch (error) {
            console.error(error)
        }
    }

    const handelLike = async () => {
        try {
            await likeMessage(id)
            await getMessages()
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="message-card">
            <div className="message-content">{content}</div>
            <div className="message-meta">
                <span className="message-author">{username}</span>
                <span className="message-time">{createdAt}</span>
            </div>
            <div className="message-actions">
                <button
                    onClick={handelLike}
                    className="action-button"
                >
                    <span>{likedBy.contains((el) => el == loggedUserId )}❤️🤍</span>
                    <span>{likes}</span>
                </button>
            </div>
            <div className="message-actions">
                <button
                    onClick={handleReport}
                    className="action-button"
                >
                    <span>🚩</span>
                    <span>Пожаловаться</span>
                </button>
            </div>
            <div className="message-actions">
                <button
                    onClick={handelDelete}
                    className="action-button delete"
                >
                    <span>🗑️</span>
                    <span>Удалить</span>
                </button>
            </div>
        </div>
    )
}

export default MessageCard
