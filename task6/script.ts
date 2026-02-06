window.onload = () => {

    enum ValidationState {
        Valid = "valid",
        Invalid = "invalid"
    }

    interface FieldConfig {
        el: string;
        msg: string;
        validate: (v: string) => boolean;
    }

    const form = document.getElementById("regForm") as HTMLFormElement;
    const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
    const successMsg = document.getElementById("successMsg") as HTMLDivElement;

    const today: Date = new Date();
    const maxDob: Date = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    );

  const dobInput = document.getElementById("dob") as HTMLInputElement | null;
if (dobInput) {
    dobInput.max = maxDob.toISOString().split("T")[0];
}


    const fields: Record<string, FieldConfig> = {
        name: { el: "name", msg: "nameMsg", validate: v => v.trim().length > 0 },
        email: { el: "email", msg: "emailMsg", validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
        pass: { el: "pass", msg: "passMsg", validate: v => v.length >= 6 },
        dob: { el: "dob", msg: "dobMsg", validate: v => v !== "" && new Date(v) <= maxDob },
        phone: { el: "phone", msg: "phoneMsg", validate: v => /^\d{10}$/.test(v.replace(/\D/g, "")) }
    };

    const fieldArray = Object.keys(fields).map(k => fields[k]);

    fieldArray.forEach(f => {
        const input = document.getElementById(f.el) as HTMLInputElement;
        input.addEventListener("input", () => validateField(f));
    });

    function validateField(f: FieldConfig): void {
        const input = document.getElementById(f.el) as HTMLInputElement;
        const msg = document.getElementById(f.msg) as HTMLDivElement;
        const val = input.value;
        const ok = f.validate(val);

        input.className = ok ? ValidationState.Valid : ValidationState.Invalid;
        msg.textContent = "";

        if (!ok && val) {
            if (f.el === "name") msg.textContent = "Required";
            if (f.el === "email") msg.textContent = "Invalid email";
            if (f.el === "pass") msg.textContent = "Min 6 chars";
            if (f.el === "dob") msg.textContent = "18+ only";
            if (f.el === "phone") msg.textContent = "10 digits";
        }

        toggleBtn();
    }

    function toggleBtn(): void {
        const all = fieldArray.every(f => {
            const val = (document.getElementById(f.el) as HTMLInputElement).value;
            return f.validate(val);
        });

        submitBtn.disabled = !all;
    }

    form.onsubmit = (e: Event): void => {
        e.preventDefault();
        form.style.display = "none";
        successMsg.style.display = "block";
    };

};
