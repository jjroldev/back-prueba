export class ApiResponse {
    static success(res: any, data: any, message = "Operación exitosa", code = 0, status = 200) {
        return res.status(status).json({
            code,
            success: true,
            message,
            data
        });
    }

    static error(res: any, message = "Error interno", code = -1, status = 500) {
        return res.status(status).json({
            code,
            success: false,
            message,
            data: null
        });
    }
}
