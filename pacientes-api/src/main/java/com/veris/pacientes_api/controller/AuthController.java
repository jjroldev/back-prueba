@RestController
@RequestMapping("/autenticacion")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestHeader("Authorization") String authHeader) {

        if (!authHeader.startsWith("Basic ")) {
            return ResponseEntity.status(401).build();
        }

        String base64 = authHeader.substring(6);
        String decoded = new String(Base64.getDecoder().decode(base64));
        String[] creds = decoded.split(":");

        if ("VERIS".equals(creds[0]) && "PRUEBAS123".equals(creds[1])) {
            String token = JwtUtil.generateToken("VERIS");
            return ResponseEntity.ok(Map.of("token", token));
        }

        return ResponseEntity.status(401).build();
    }
}
