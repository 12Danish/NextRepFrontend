import Upgrade from "./Upgrade";
export default function PremiumMembership() {
    return (
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
        <div className="mb-3">
          <div className="text-sm font-medium mb-1">50% off on Premium Membership</div>
          <div className="text-xs text-purple-100">
            Join today and enjoy health and fitness experience like never before.
          </div>
        </div>
       <Upgrade />
      </div>
    )
}