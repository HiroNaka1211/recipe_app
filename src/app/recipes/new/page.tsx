"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewRecipePage() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    //DB登録処理
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error("登録に失敗しました。");
      }
      router.push("/recipes");
    } catch (error) {
      setError("登録に失敗しました。");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto p-4">
      <h1>レシピ追加</h1>
      <form onSubmit={handleSubmit} className="">
        <div>
          <label className="">タイトル</label>
          <input
            className=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="">説明</label>
          <input
            className=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button disabled={loading} className="">
          {loading ? "保存中..." : "保存"}
        </button>
      </form>
    </div>
  );
}
